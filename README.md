# PDF-Viewer

## Description
PDF-Viewer is a custom wrapper around `ng2-pdf-viewer` that allows you to view, tag, highlight and comment PDF documents with your Angular app.

## Installation
1. The the following command to install the package: `npm i @modusoperandi/pdf-viewer`.
2. Import the `MoPdfViewerComponent` in your apps module imports.
3. Add the component anywhere in your app using the following selector: `<mo-pdf-viewer />`

## Usage
The mo-pdf-viewer component current has one required input and several option inputs:

- `pdfSrc` **[string | Uint8Array]** ***(Required)***: The PDF source you are wanting to view.
- `documentTitle` **[string]**: The title of the PDF you are viewing.
- `documentClassification` **[string]**: The classification of the PDF you are viewing.
- `documentAuthor` **[string]**: The author of the PDF you are viewing.
- `minimalView` **[boolean]**: If `true`, the editor tools will not be displayed and the document will be viewable only.
