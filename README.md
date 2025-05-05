# GenAI Medical Chatbot 🏥

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Python Version](https://img.shields.io/badge/python-3.9-green)
![Framework](https://img.shields.io/badge/framework-FastAPI-009688)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)

A sophisticated medical Q&A system built with RAG (Retrieval Augmented Generation) that leverages the power of LLMs to provide accurate medical information by retrieving context from trusted medical literature.

## 📹 Demo Video
**👇 Click on the image below to watch the project demo video 👇**

[![Medical Chatbot Demo](https://img.youtube.com/vi/6nqiheij6fQ/0.jpg)](https://www.youtube.com/watch?v=6nqiheij6fQ)

## 🌟 Features

- **RAG-Based Medical Knowledge System**: Retrieves contextual information from medical documents to generate accurate responses
- **Document Processing Pipeline**: Extracts, chunks, and embeds information from PDF medical sources
- **Vector Database Integration**: Efficiently stores and retrieves medical knowledge using Pinecone
- **Modern React Frontend**: Responsive UI with dark/light mode, keyboard shortcuts, and smooth animations
- **FastAPI Backend**: High-performance API endpoints with comprehensive error handling
- **Local LLM Integration**: Uses the Ollama framework to run Llama3.2 models locally

## 🏗️ Architecture

```
┌────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│                │     │                  │     │                    │
│  PDF Medical   │────▶│  Text Extraction │────▶│  Text Chunking     │
│  Documents     │     │  & Processing    │     │  & Preparation     │
│                │     │                  │     │                    │
└────────────────┘     └──────────────────┘     └─────────┬──────────┘
                                                         │
                                                         ▼
┌────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│                │     │                  │     │                    │
│  User Query    │────▶│  Query Embedding │     │  Vector Embeddings │
│  (Frontend)    │     │  & Processing    │◀────│  (HuggingFace)     │
│                │     │                  │     │                    │
└────────┬───────┘     └────────┬─────────┘     └────────────────────┘
         │                      │
         │                      ▼
┌────────▼───────┐     ┌──────────────────┐     ┌────────────────────┐
│                │     │                  │     │                    │
│  FastAPI       │◀────│  RAG Knowledge   │◀────│  Pinecone Vector   │
│  Backend       │     │  Retrieval       │     │  Database          │
│                │     │                  │     │                    │
└────────────────┘     └──────────────────┘     └────────────────────┘
```

## 🔧 Tech Stack

### Backend
- **FastAPI**: High-performance web framework for building APIs
- **LangChain**: Framework for developing applications powered by language models
- **Pinecone**: Vector database for storing and retrieving embeddings
- **HuggingFace Embeddings**: Sentence transformers for text embedding
- **Ollama**: Framework for running Llama3.2 models locally
- **PyPDF**: For extracting text from PDF medical documents

### Frontend
- **React**: Modern UI library for building user interfaces
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **React Icons**: Icon library for React applications

## 🚀 Getting Started

### Prerequisites

- Git
- Anaconda or Miniconda
- Python 3.9+
- Node.js and npm
- Ollama installed locally

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Haraprosad/GenAI-Medical-Chatbot.git
cd GenAI-Medical-Chatbot
```

#### Step 2: Set Up the Backend

Create and activate a conda environment:
```bash
conda create -n medical-chatbot-env python=3.9
conda activate medical-chatbot-env
```

Install backend dependencies:
```bash
pip install -r requirements.txt
```

Set up your environment variables in `.env`:
```
PINECONE_API_KEY="your_pinecone_api_key"
```

#### Step 3: Process Documents and Create Vector Database

Place your medical PDFs in the `Data/` directory, then build the vector database:
```bash
python store_index.py
```

#### Step 4: Set Up the Frontend

Navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

#### Step 5: Run the Application

Start the backend server:
```bash
# In the root directory
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

In a separate terminal, start the frontend:
```bash
# In the frontend directory
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

## 📂 Project Structure

```
GenAI-Medical-Chatbot/
├── app.py                  # FastAPI backend implementation
├── store_index.py          # Script to process PDFs and build Pinecone index
├── requirements.txt        # Python dependencies
├── src/
│   ├── __init__.py
│   ├── helper.py           # Utility functions for document processing
│   └── prompt.py           # LLM prompt templates
├── Data/                   # Medical PDF documents
│   └── Medical_book.pdf
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main React component
│   │   └── ...
│   ├── package.json        # Frontend dependencies
│   └── ...
└── research/
    └── trials.ipynb        # Development notebook with prototype code
```

## 🔄 How the RAG System Works

1. **Document Processing**: Medical PDFs are loaded, parsed, and split into manageable chunks
2. **Embedding Generation**: Text chunks are converted to vector embeddings using HuggingFace models
3. **Vector Database Storage**: Embeddings are stored in Pinecone with metadata
4. **Query Processing**: User questions are embedded and semantically searched in Pinecone
5. **Context Retrieval**: Relevant medical context is extracted from the vector database
6. **Response Generation**: The LLM generates responses using the retrieved context and medical knowledge

## 🧩 Key Components

### Frontend
- **Welcome Component**: Provides a user-friendly introduction with sample questions
- **Chat Interface**: Smooth, responsive design with typing indicators and message animations
- **Dark/Light Mode**: Toggle between visual themes for optimal viewing experience
- **Keyboard Shortcuts**: Productivity enhancements for frequent actions

### Backend
- **FastAPI Framework**: RESTful API endpoints with automatic OpenAPI documentation
- **RAG Pipeline**: Sophisticated document retrieval and answer generation system
- **Vector Search**: Semantic similarity search for finding relevant medical information
- **Context-Aware Responses**: Ensures medically accurate answers based on source documents

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Haraprosad Biswas - bharaprosad@gmail.com

Project Link: [https://github.com/Haraprosad/GenAI-Medical-Chatbot](https://github.com/Haraprosad/GenAI-Medical-Chatbot)

---

⭐ Star this repository if you find it useful!

