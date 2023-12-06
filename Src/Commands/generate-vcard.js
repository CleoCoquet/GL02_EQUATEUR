//5
function generateVCard(teacherInfo) {
    // Créer le contenu vCard
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${teacherInfo.fullName}
ORG:${teacherInfo.organization || ''}
TEL:${teacherInfo.phoneNumber || ''}
EMAIL:${teacherInfo.email || ''}
END:VCARD
`;

    // Convertir le contenu en Blob
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });

    // Créer un lien pour télécharger le fichier vCard
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', 'teacher_vcard.vcf');
    document.body.appendChild(downloadLink);

    // Simuler un clic sur le lien pour déclencher le téléchargement
    downloadLink.click();

    // Nettoyer le lien après le téléchargement
    document.body.removeChild(downloadLink);
}

// Exemple d'utilisation
const teacherInfo = {
    fullName: 'John Doe',
    organization: 'School XYZ',
    phoneNumber: '123456789',
    email: 'john.doe@example.com',
};

generateVCard(teacherInfo);