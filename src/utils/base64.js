async function base64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export function getBase64Image(base64) {
    if (!base64) return '';
    if (base64.includes('data:image') || base64.includes('http')) return base64;

    const extensionsType = {
        '/': 'image/jpg',
        'i': 'image/png',
        'R': 'image/gif',
        'U': 'image/webp'
    }

    const control = base64.charAt(0);
    const type = extensionsType[control] || 'image/png';

    return `data:${type};base64,${base64}`;
}

export async function getBase64(file) {
    let value = await base64(file);
    value = value.replace("data:image/jpeg;base64,", "");
    value = value.replace("data:image/png;base64,", "");
    value = value.replace("data:image/gif;base64,", "");
    value = value.replace("data:image/bmp;base64,", "");
    return value;
}