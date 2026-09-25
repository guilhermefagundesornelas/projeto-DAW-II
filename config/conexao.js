import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

const url = "mongodb+srv://guilherme123:gui123@guilhermeornelasmongo.zxa3hvt.mongodb.net/?appName=GuilhermeOrnelasMongo"

const conexao = await mongoose.connect(url)

export default conexao
