import http.server
import socketserver
import os
import json
import re

PORT = 8080

class JSONHandler:
    def __init__(self, file_name):
        self.file_name = file_name

    def read(self, record_id=None):
        if os.path.isfile(self.file_name):
            try:
                with open(self.file_name, "r", encoding="utf-8") as file:
                    data = json.load(file)
                    if record_id:
                        return next((item for item in data if item["id"] == record_id), None)
                    return data
            except json.JSONDecodeError:
                print("Erro ao ler o JSON. O formato pode estar incorreto.")
                return None
            except FileNotFoundError:
                print("Arquivo não encontrado.")
                return None
        return None

    def create(self, new_data):
        pass

    def update(self, record_id, updated_data):
        pass

    def delete(self, record_id):
        pass

    def put(self, record_id, updated_data):
        data = self.read()
        for item in data:
            if item["id"] == record_id:
                item.update(updated_data)
                # Se a condição for "Novo", remove atributos exclusivos de usados
                if item.get("condicao") == "Novo":
                    for campo in ["quilometragem", "documentacao", "sinistro"]:
                        item.pop(campo, None)  # Remove sem erro se não existir
                self.write(data)
                return item
        return None

class Handler(http.server.SimpleHTTPRequestHandler):
    def response(self, code, content_type, message):
        self.send_response(code)
        self.send_header("Content-type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(message.encode("utf-8"))

    def do_GET(self):
        self.handle_request("GET")

    def do_POST(self):
        self.handle_request("POST")

    def do_PUT(self):
        self.handle_request("PUT")

    def do_DELETE(self):
        self.handle_request("DELETE")

    def handle_request(self, method):
        match = re.match(r"/([a-zA-Z0-9_-]+)/([^/]+)(?:/(\d+))?", self.path)
        
        if match:
            entity = match.group(1)
            action = match.group(2)
            record_id = match.group(3)
            file_name = f"{entity}.json"

            handler = JSONHandler(file_name)
            
            if action == "read":
                if record_id:
                    data = handler.read(int(record_id))
                    if data is None:
                        self.response(404, "text/plain", "Record not found!")
                        return
                else:
                    data = handler.read()
                    if data is None:
                        self.response(404, "text/plain", "File not found!")
                        return
                self.response(200, "application/json", json.dumps(data))
            
            elif action in ["create", "update", "delete"]:
                self.response(200, "text/plain", f"{action.capitalize()} action simulated!")
        
        else:
            self.response(404, "text/plain", "Endpoint not found!")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running on port {PORT}")
    httpd.serve_forever()
