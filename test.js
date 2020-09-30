var  nodemailer = require('nodemailer')
const sendMail = (rec) => {
    var status = rec.sexe == "Feminin" ? "Madame" : "Monsieur"
    transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'nodyTic@gmail.com',
            pass: '@Aristide55'
        }
    });

    var mailOptions = {
        from: 'nodyTic@gmail.com',
        to: rec.mail,
        subject: 'FACTURE - WINHEALTH',
        html: `
        <h1>References facture</h1>
        <p>${status} <b>${rec.nom} ${rec.prenoms}</b> votre inscription a été prise en compte.Nous vous communiquerons la date et le lieu de la conférence ultérieurement.</p><p>Cordialement.</p><br><p>M. Altea, Ingénieur Télécom</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

sendMail({sexe:"masculin",nom:"edy",prenoms:"kouassi edy", mail:"koffiedy@gmail.com"})