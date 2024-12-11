import http.server
import socketserver
import os
import json

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def response(self, code, content_type, message):
        self.send_response(code)
        self.send_header("Content-type", content_type)
        self.end_headers()
        self.wfile.write(message.encode("utf-8"))

    def do_GET(self):
        file = self.path.strip("/") + ".json"
        if os.path.isfile(file):
            try:
                with open(file, "r", encoding="utf-8") as line:
                    data = json.load(line)
                self.response(200, "application/json", json.dumps(data))
            except Exception:
                self.response(500, "text/plain", "Error")
        else:
            self.response(404, "text/plain", "File not found!")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Port: {PORT}")
    httpd.serve_forever()
