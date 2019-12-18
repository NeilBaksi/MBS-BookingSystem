const functions = require("firebase-functions");
const rp = require("request-promise-native");
const cors = require("cors")({
	origin: true
});
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "enquiries.makeupbyshimona@gmail.com",
		pass: "suneetmonika1"
	}
});

exports.sendMail = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		// getting dest email by query string
		// const dest = req.query.dest;
		var dest = "snb.1996@gmail.com";

		const mailOptions = {
			from: 'Your Account Name <enquiries.makeupbyshimona@gmail.com"', // Something like: Jane Doe <janedoe@gmail.com>
			to: dest,
			subject: "I'M A PICKLE!!!", // email subject
			html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
		};

		// returning result
		return transporter.sendMail(mailOptions, (erro, info) => {
			if (erro) {
				return res.send(erro.toString());
			}
			return res.send("Sended");
		});
	});
});
exports.emailMessage = functions.https.onRequest((req, res) => {
	// const { name, email, phone, message } = req.body;
	let name = "neil";
	let email = "snb.1996@gmail.com";
	let message = "tis a test";

	return cors(req, res, () => {
		var text = `<div>
		<h4>Information</h4>
		<ul>
		  <li>
			Name - ${name || ""}
		  </li>
		  <li>
			Email - ${email || ""}
		  </li>
		</ul>
		<h4>Message</h4>
		<p>${message || ""}</p>
	  </div>`;
		var sesAccessKey = "enquiries.makeupbyshimona@gmail.com";
		var sesSecretKey = "suneetmonika1";

		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: "gmail",
				auth: {
					user: sesAccessKey,
					pass: sesSecretKey
				}
			})
		);
		const mailOptions = {
			to: "snb.1996@gmail.com",
			from: `${sesAccessKey}`,
			subject: `${name} sent you a new message`,
			text: text,
			html: text
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error.message);
			}
			res.status(200).send({
				message: "success"
			});
		});
	}).catch(() => {
		res.status(500).send("error");
	});
});

exports.getDistance = functions.https.onRequest((request, response) => {
	cors(request, response, () => {});
	var destination = request.query.dest;
	var options = {
		uri:
			"https://maps.googleapis.com/maps/api/distancematrix/json?origins=%225%20Baywater%20Dr,%20Wentworth%20Point%20NSW%202127,%20Australia%22&destinations=" +
			destination +
			"&key=AIzaSyBhVWygAuZE8hyaosyAHDXWJ-RrlfJakak",
		method: "GET"
	};
	rp(options)
		.then(res => {
			console.log(res);
			return response.send(res);
		})
		.catch(console.error);
	return;
});
