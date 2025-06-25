export default function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, phone, message } = req.body;

        // İşlem burada yapılabilir: e-posta, veritabanı vs.
        res.status(200).json({ message: 'Başarıyla alındı!' });
    } else {
        res.status(405).json({ message: 'Yalnızca POST isteği kabul edilir.' });
    }
}
