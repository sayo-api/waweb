const qrcode = require("qrcode-terminal")
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js")


let sessionPath = `./ayu.json`

async function onlainekk() {
    const ayu = new Client({
        authStrategy: new LocalAuth({
            dataPath: `./ayu.json`
        }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    })

       ayu.initialize()

        ayu.on("qr", qr => {
            qrcode.generate(qr, { small: true })
        })
    

    ayu.on("authenticated", async(auth) => {
        console.log(auth)
    })

    ayu.on("auth_failure", async(auth_err) => {
        console.log(auth_err)
    })

    ayu.on("ready", () => {
        console.log(chalk.greenBright("Bot On"))
    })

    ayu.on("disconnected", async(reason) => {
        console.log("Desconectou aqui ", reason)
        onlainekk()
    })

    ayu.on("message_create", (msg) => {
        try {
            if (!msg) return
            if (!global.options.public && !msg.fromMe) return
            if (msg.id.id.startsWith("3EB") && msg.id.id.length == 20) return
            require("./botwa")(ayu, msg, Commands)
        } catch(e) {
            console.error(e)
        }
    })

    return ayu
}

onlainekk()