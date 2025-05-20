#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 20 19:38:55 2025

@author: saadyousaf
"""

import pdfplumber
import camelot
import pandas as pd

def extract_text_simplest(pdf_path):
    """
    Extracts text from a PDF using pdfplumber with minimal code.

    Args:
        pdf_path (str): Path to the PDF file.

    Returns:
        str: Extracted text, or None on error.
    """
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = "".join(page.extract_text() for page in pdf.pages)  # Extract from all pages
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

def extract_tables_simplest(pdf_path):
    """
    Extracts tables from a PDF using camelot with the 'lattice' flavor and returns the first table.

    Args:
        pdf_path (str): Path to the PDF file.

    Returns:
        pandas.DataFrame: The first extracted table as a DataFrame, or None on error.
    """
    try:
        tables = camelot.read_pdf(pdf_path, flavor='lattice')  # Use 'lattice' for simplicity
        if tables:
            return tables[0].df  # Return the first table's DataFrame
        else:
            return None
    except Exception as e:
        print(f"Error extracting tables: {e}")
        return None

# Example usage (replace 'your_file.pdf' with a suitable PDF):
pdf_file = 'your_file.pdf'

# Create a dummy PDF if 'your_file.pdf' doesn't exist
try:
    from reportlab.pdfgen import canvas
    c = canvas.Canvas(pdf_file)
    c.drawString(100, 750, "Sample PDF Content")
    c.drawString(100, 650, "Sample Table:")
    data = [["A", "B", "C"], [1, 2, 3], [4, 5, 6]]
    x_start = 100
    y_start = 630
    row_height = 20
    col_width = 50
    for r_idx, row in enumerate(data):
        for c_idx, cell in enumerate(row):
            c.drawString(x_start + c_idx * col_width, y_start - r_idx * row_height, str(cell))
    c.save()
    print(f"Created dummy PDF 'your_file.pdf'.")
except ImportError:
    print(f"Please provide a PDF named 'your_file.pdf', or install reportlab (pip install reportlab).")
    pdf_file = input("Enter path to your PDF: ") # Prompt for PDF if reportlab is not available

# 1. Extracting Text (simplest)
extracted_text = extract_text_simplest(pdf_file)
if extracted_text:
    print("\n--- Extracted Text ---")
    print(extracted_text[:200], "...")  # Print only the first 200 characters

# 2. Extracting Tables (simplest)
extracted_table = extract_tables_simplest(pdf_file)
if extracted_table is not None:
    print("\n--- Extracted Table (First Table) ---")
    print(extracted_table.head())  # Print the first few rows
