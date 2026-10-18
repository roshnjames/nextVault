import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Platform } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

export const createAndSaveBackupFile = async(data ={}) => {
    try {
        const jsonData = JSON.stringify(data, null, 4);
        const filename = `tn_db_backup_${Date.now()}.json`;
        const filepath = FileSystem.documentDirectory + filename;
        
        if (Platform.OS === 'ios') {
            await FileSystem.writeAsStringAsync(
                filepath,
                jsonData,
                {
                    encoding: FileSystem.EncodingType.UTF8,
                }
            );

            await Sharing.shareAsync(filepath, {
                mimeType: 'application/json',
                UTI: 'public.json',
                dialogTitle: 'Save JSON file',
            });

            return true;
        }

        if (Platform.OS === 'android') {
            const permission =
                await FileSystem.StorageAccessFramework
                    .requestDirectoryPermissionsAsync();

            if (!permission.granted) throw new Error('permission');

            const filepath =
                await FileSystem.StorageAccessFramework.createFileAsync(
                    permission.directoryUri,
                    filename,
                    'application/json'
                );

            await FileSystem.writeAsStringAsync(
                filepath,
                jsonData,
                {
                    encoding: FileSystem.EncodingType.UTF8,
                }
            );

            return true;
        }

        throw new Error('failed');
    } catch (error) {
        throw error;
    }
};

export const loadDataFromRestoreFile = async() => {
    try{
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/json',
            copyToCacheDirectory: true,
            multiple: false,
        });

        if(result.canceled) throw new Error('cancelled');

        const selectedFile = result.assets[0];

        const content = await FileSystem.readAsStringAsync(
            selectedFile.uri
        );

        const data = JSON.parse(content);

        return data || {};

    }catch(error){
        throw error;
    }
}