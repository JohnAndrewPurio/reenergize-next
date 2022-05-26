import { ShowOptions, Toast } from '@capacitor/toast';

export const showToast = async (options: ShowOptions) => {
    try {
        await Toast.show(options)
    } catch (error) {
        throw error
    }
}