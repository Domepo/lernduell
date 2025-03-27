# BUILD:
# docker build -t lernduell-app .
# RUN:
# docker run -p 80:80 -p 3000:3000 --rm lernduell-app
#
# bauen -> in ornder -> nginx ws -> python script
#
#
#
#
# === STAGE 1: Build Angular App ===
FROM node:23 AS frontend-builder

WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend

RUN npm install -g @angular/cli \
    && npm install \
    && ng build --configuration production --base-href "/"

# === STAGE 2: Backend and NGINX Setup ===
FROM python:3.13-slim

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    python3-dev \
    portaudio19-dev \
    bash \
    nginx \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Backend setup
WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/

# Copy Angular build from previous stage
COPY --from=frontend-builder /app/frontend/dist/lernduell/browser /usr/share/nginx/html/

# NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports (adjust if needed)
EXPOSE 80 3000


# CMD: Start both backend and nginx
CMD bash -c "python3 backend/src/main.py & nginx -g 'daemon off;' & wait -n"
