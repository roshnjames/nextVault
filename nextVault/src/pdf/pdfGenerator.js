import * as FileSystem from 'expo-file-system/legacy';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

const escapeHtml = (value) => {
    return String(value ?? '-').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
};

const generateTaskTable = (tasks = []) => {
    const taskRows = tasks.map((task, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(task.task_name)}</td>
            <td>${escapeHtml(task.task_priority)}</td>
            <td>${escapeHtml(task.task_details)}</td>
            <td>${task.task_alert ? 'Enabled' : 'Disabled'}</td>
            <td>${escapeHtml(task.task_date)}</td>
            <td>${escapeHtml(task.task_time)}</td>
        </tr>
    `).join('');

    return `
        <table>
            <caption>Tasks</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Details</th>
                    <th>Notification</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                ${taskRows || `
                    <tr>
                        <td colspan="7">No Data...</td>
                    </tr>
                `}
            </tbody>
        </table>
    `;
};

const generateNotesTable = (notes = []) => {
    const noteRows = notes.map((note, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(note.note_title)}</td>
            <td>${escapeHtml(note.note_detail)}</td>
        </tr>
    `).join('');

    return `
        <table>
            <caption>Notes</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                ${noteRows || `
                    <tr>
                        <td colspan="3">No Data...</td>
                    </tr>
                `}
            </tbody>
        </table>
    `;
};

const htmlBodyGenerator = (taskData, noteData) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Tracker Data</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f0eef7;
                    padding: 20px;
                }

                .page {
                    background: white;
                    width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .header {
                    background: #17132e;
                    color: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                }

                .header h1 {
                    margin: 0 0 8px;
                }

                .summary {
                    margin: 25px 0;
                    padding: 15px;
                    background: #f3f0ff;
                    border-left: 4px solid #7c3aed;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0 30px;
                    font-size: 10px;
                    table-layout: auto;
                }

                caption {
                    caption-side: top;
                    font-size: 18px;
                    font-weight: bold;
                    color: #17132e;
                    padding: 12px;
                    text-align: left;
                }

                th, td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                    overflow-wrap: anywhere;
                }

                th {
                    background: #17132e;
                    color: white;
                }

                tbody tr:nth-child(even) {
                    background: #f3f0ff;
                }
            </style>
        </head>

        <body>
            <div class="page">
                <div class="header">
                    <h1>Tracker Data</h1>
                    <p>Tasks and Notes Database </p>
                </div>

                ${taskData}

                ${noteData}
            </div>
        </body>
        </html>
    `;
};

export const generateDataPDF = async (tasks = [], notes = []) => {
    try {
        const validTasks = Array.isArray(tasks) ? tasks : [];
        const validNotes = Array.isArray(notes) ? notes : [];

        const taskData = generateTaskTable(validTasks);
        const noteData = generateNotesTable(validNotes);

        const html = htmlBodyGenerator(taskData, noteData);

        const result = await Print.printToFileAsync({ html });

        if (Platform.OS === 'ios') {
            await Sharing.shareAsync(result.uri, {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf',
                dialogTitle: 'Save file',
            });

            return result.uri;
        }

        const permission =
            await FileSystem.StorageAccessFramework
                .requestDirectoryPermissionsAsync();

        if (!permission.granted) {
            await Sharing.shareAsync(result.uri, {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf',
                dialogTitle: 'Save file',
            });

            throw new Error('permission');
        }

        const destinationUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                `Database_Report_${Date.now()}.pdf`,
                'application/pdf'
            );

        const base64 = await FileSystem.readAsStringAsync(
            result.uri,
            { encoding: FileSystem.EncodingType.Base64 }
        );

        await FileSystem.writeAsStringAsync(
            destinationUri,
            base64,
            { encoding: FileSystem.EncodingType.Base64 }
        );

        return destinationUri;

    } catch (error) {
        throw error;
    }
};