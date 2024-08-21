import mammoth from 'mammoth';
import { read, utils } from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};

export const generatePreview = async (file) => {
    const fileType = file.type;
    let previewBase64;
    if (fileType === 'application/pdf') {
        previewBase64 = await generatePdfPreview(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        previewBase64 = await generateDocxPreview(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        previewBase64 = await generateXlsxPreview(file);
    } else if (fileType.startsWith('image/')) {
        previewBase64 = await generateImagePreview(file);
    }

    const mimeType = previewBase64.split(',')[0].match(/:(.*?);/)[1];
    return base64ToBlob(previewBase64, mimeType);
};

const generatePdfPreview = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    // Create a canvas element for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Return the image data URL (base64 encoded PNG)
    return canvas.toDataURL('image/png');
};

const generateDocxPreview = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value; // The generated HTML
    const previewText = html.substring(0, 200); // Extract first 200 characters
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillText(previewText, 10, 10);
    return canvas.toDataURL('image/png');
};

const generateXlsxPreview = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
    // Render a preview table in canvas or extract some text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillText(JSON.stringify(jsonData[0]), 10, 10); // Example: render first row
    return canvas.toDataURL('image/png');
};

const generateImagePreview = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
    });
};

