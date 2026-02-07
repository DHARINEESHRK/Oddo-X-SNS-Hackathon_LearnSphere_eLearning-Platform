# LearnSphere - Backend API

A robust backend service for uploading and managing images, videos, and PDFs with cloud-powered storage using Cloudinary and MongoDB.

## 🚀 Features

- **Multi-file Support**: Upload and manage images, videos, and PDF documents.
- **Cloud Storage**: Secure storage on Cloudinary.
- **Database**: Metadata management using MongoDB and Mongoose.
- **JWT Authentication**: Middleware ready for authentication implementation.
- **File Validation**: Automatic handling of different file types and sizes.

## 🛠️ Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB + Mongoose**: Database and ORM
- **Multer**: File upload handling
- **Cloudinary**: Cloud storage service

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configuration:
   Create a `.env` file with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at: **http://localhost:5000**

## 🎯 API Endpoints

### 📸 Upload File
`POST /api/upload`

Upload an image, video, or PDF.

**Headers:**
- `X-User-ID`: User identifier (for tracking uploads)

**Body:**
- `image`: File (multipart/form-data) - *Note: The field name is 'image' regardless of file type.*

**Response:**
```json
{
  "message": "IMAGE uploaded successfully",
  "file": {
    "_id": "...",
    "url": "https://res.cloudinary.com/...",
    "publicId": "...",
    "fileType": "image"
  }
}
```

### 📂 List All Files
`GET /api/files`

Fetch all uploaded files sorted by creation date.

**Response:**
```json
{
  "files": [
    {
      "_id": "...",
      "url": "...",
      "publicId": "...",
      "fileType": "image",
      "createdAt": "..."
    },
    ...
  ]
}
```

## 🏗️ Project Structure

```
├── authentiction/         # JWT Middleware
├── config/                # Cloudinary Configuration
├── database/              # DB Connection Logic
├── helpers/               # Cloudinary Upload Helpers
├── middleware/            # Multer Configuration
├── model/                 # Mongoose Models (Image, Video, Pdf)
├── uplodcntrl/            # Route Controllers
├── uploads/               # Temporary Local Storage
├── server.js              # Entry Point
└── package.json
```

## 📝 License

This project is for educational purposes.
