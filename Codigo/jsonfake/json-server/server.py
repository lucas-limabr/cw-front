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
                    if record_id is not None:
                        return next((item for item in data if item["id"] == record_id), None)
                    return data
            except (json.JSONDecodeError, FileNotFoundError):
                return []
        return []

    def write(self, data):
        with open(self.file_name, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

    def post(self, new_data):
        data = self.read()
        new_data["id"] = max([item["id"] for item in data], default=0) + 1
        data.append(new_data)
        self.write(data)
        return new_data

    def put(self, record_id, updated_data):
        data = self.read()
        for item in data:
            if item["id"] == record_id:
                item.update(updated_data)
                self.write(data)
                return item
        return None

    def delete(self, record_id):
        data = self.read()
        new_data = [item for item in data if item["id"] != record_id]
        if len(new_data) < len(data):
            self.write(new_data)
            return True
        return False

class Handler(http.server.SimpleHTTPRequestHandler):
    def response(self, code, content_type, message):
        self.send_response(code)
        self.send_header("Content-type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        if isinstance(message, dict) or isinstance(message, list):
            message = json.dumps(message)
        self.wfile.write(message.encode("utf-8"))

    def do_OPTIONS(self):
        self.response(200, "text/plain", "")

    def do_GET(self):
        match = re.match(r"/([^/]+)(?:/(\d+))?", self.path)
        if match:
            entity = match.group(1)
            record_id = int(match.group(2)) if match.group(2) else None
            handler = JSONHandler(f"{entity}.json")
            data = handler.read(record_id)
            if data is not None:
                self.response(200, "application/json", data)
            else:
                self.response(404, "application/json", {"error": "Registro não encontrado"})
        else:
            self.response(404, "application/json", {"error": "Rota inválida"})

    def do_POST(self):
        match = re.match(r"/([^/]+)", self.path)
        if match:
            entity = match.group(1)
            handler = JSONHandler(f"{entity}.json")
            content_length = int(self.headers["Content-Length"])
            post_data = json.loads(self.rfile.read(content_length).decode("utf-8"))
            new_record = handler.post(post_data)
            self.response(201, "application/json", new_record)
        else:
            self.response(400, "application/json", {"error": "Rota inválida"})

    def do_PUT(self):
        match = re.match(r"/([^/]+)/(\d+)", self.path)
        if match:
            entity = match.group(1)
            record_id = int(match.group(2))
            handler = JSONHandler(f"{entity}.json")
            content_length = int(self.headers["Content-Length"])
            update_data = json.loads(self.rfile.read(content_length).decode("utf-8"))
            updated_record = handler.put(record_id, update_data)
            if updated_record:
                self.response(200, "application/json", updated_record)
            else:
                self.response(404, "application/json", {"error": "Registro não encontrado"})
        else:
            self.response(400, "application/json", {"error": "Rota inválida"})

    def do_DELETE(self):
        match = re.match(r"/([^/]+)/(\d+)", self.path)
        if match:
            entity = match.group(1)
            record_id = int(match.group(2))
            handler = JSONHandler(f"{entity}.json")
            if handler.delete(record_id):
                self.response(200, "application/json", {"message": "Registro deletado com sucesso"})
            else:
                self.response(404, "application/json", {"error": "Registro não encontrado"})
        else:
            self.response(400, "application/json", {"error": "Rota inválida"})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando na porta {PORT}")
    httpd.serve_forever()
