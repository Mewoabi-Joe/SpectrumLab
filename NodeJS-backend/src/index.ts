import express from "express";
const mongoose = require("mongoose");
import cors from "cors";
import userRoutes from "./routes/user.routes";
import categotyRoutes from "./routes/category.routes";
import testRoutes from "./routes/test.routes";
import paymentRoutes from "./payment/payment.routes";
import messageRoutes from "./routes/message.routes";
import rendezvousRoutes from "./routes/rendezvous.routes";
import postsRoutes from "./routes/posts.routes";
// require("dotenv").config()

const PORT = process.env.PORT;

const main = async () => {
	// const url = "mongodb+srv://ballack:ballack@clinic.devq6fd.mongodb.net/?retryWrites=true&w=majority";
	const url =
		"mongodb+srv://leontiusmewoabi:b2c5EAoVpr9ckgGT@cluster0.nxy2ljt.mongodb.net/?retryWrites=true&w=majority";
	// const url = "mongodb://localhost:27017/quizDB"

	const connectionParams = {
		useNewUrlParser: true,
		// useCreateIndex: true,
		useUnifiedTopology: true,
	};

	// mongoose.connect("mongodb://localhost:27017/clinic", {
	//   useNewUrlParser: true,
	//   useUnifiedTopology: true,
	// })

	mongoose
		.connect(url, connectionParams)
		.then(() => {
			console.log("Connected to the database ");
		})
		.catch((err: any) => {
			console.error(`Error connecting to the database. n${err}`);
		});

	const app = express();
	app.use(cors());
	app.use(express.json());
	app.use("/auth", userRoutes);
	app.use("", categotyRoutes);
	app.use("", testRoutes);
	app.use("/payment", paymentRoutes);
	app.use("", rendezvousRoutes);
	app.use("", messageRoutes);
	app.use("", postsRoutes);

	app.listen(process.env.PORT || 8080, () => {
		console.log(`Server running on port ${process.env.PORT || 8080}`);
	});
};

main().catch((err) => {
	console.error(err);
});
