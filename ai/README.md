# AI Service — Python, FastAPI & uv

Dịch vụ AI đảm nhận xử lý sinh Khung chương trình (Curriculum Agent), sinh bài tập + đáp án + giải thích (Tutor Assistant Agent) và Moderation filter.

## Công nghệ sử dụng
- **Python 3.11**
- **uv** (Bộ quản lý gói & môi trường ảo Python siêu tốc)
- **FastAPI**
- **Uvicorn**
- **Pydantic**

## Khởi chạy dịch vụ

### 1. Khởi chạy độc lập (Local với `uv`)

Cài đặt `uv` (nếu chưa có):
```bash
# Windows (PowerShell):
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS / Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Khởi tạo môi trường ảo và cài đặt thư viện:
```bash
# Tạo môi trường ảo .venv bằng uv
uv venv

# Kích hoạt môi trường ảo:
# Windows (PowerShell):
.venv\Scripts\activate
# Linux / macOS:
source .venv/bin/activate

# Cài đặt dependencies siêu tốc bằng uv
uv pip install -r requirements.txt

# Khởi chạy server FastAPI bằng uv:
uv run uvicorn app.main:app --reload --port 8000
```

### 2. Khởi chạy qua Docker
```bash
docker build -t tutor-ai .
docker run -p 8000:8000 tutor-ai
```

## Endpoints
- `GET /health`: Kiểm tra sức khỏe AI Service.
- `GET /docs`: OpenAPI (Swagger UI) documentation.
