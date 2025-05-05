# GenAI-Medical-Chatbot

This repository contains a GenAI (Generative AI) project named GenAI-Medical-Chatbot.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Git
- Anaconda or Miniconda
- Python 3.x (specific version requirements are in requirements.txt)

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Haraprosad/GenAI-Medical-Chatbot.git
cd genai-medical-chatbot
```

#### Step 2: Create and Activate Conda Environment

Create a new conda environment:
```bash
conda create -n medical-chatbot-env python=3.9
```

Activate the environment:
```bash
conda activate medical-chatbot-env
```

#### Step 3: Install Requirements

Install all the required packages using pip:
```bash
pip install -r requirements.txt
```

## Usage

[Theses will be added gradually]

## Project Structure

```
genai-project/
├── data/              # Data files used for training/testing
├── models/            # Model files
├── notebooks/         # Jupyter notebooks for experiments
├── src/               # Source code
│   ├── __init__.py
│   ├── data/          # Data processing scripts
│   ├── models/        # Model definition files
│   └── utils/         # Utility functions
├── tests/             # Test files
├── .gitignore
├── requirements.txt   # Project dependencies
└── README.md          # This file
```

### Dependencies

MedicalBot relies on the following libraries:

- **sentence-transformers (2.2.2)**: Powers the semantic understanding of medical queries by converting text into embeddings that capture meaning
- **langchain**: Core framework that connects various components of the medical knowledge retrieval system
- **flask**: Web framework used to create the interface and API endpoints for the MedicalBot
- **pypdf**: Handles the extraction of medical information from PDF documents to build the knowledge base
- **python-dotenv**: Manages environment variables for secure API key storage
- **pinecone[grpc]**: Vector database for efficient storage and retrieval of medical text embeddings
- **langchain_pinecone**: Integration between LangChain and Pinecone for vector search operations
- **langchain_community**: Provides access to community-contributed components and integrations
- **langchain_openai**: Connects to OpenAI models for generating accurate medical responses
- **langchain_experimental**: Implements experimental features for advanced medical query processing


## Features

- [Features will be added gradually]

## License

[MIT]


## Contact

[Haraprosad Biswas] - [bharaprosad@gmail.com]

Project Link: [https://github.com/Haraprosad/GenAI-Medical-Chatbot.git](https://github.com/Haraprosad/GenAI-Medical-Chatbot.git)

