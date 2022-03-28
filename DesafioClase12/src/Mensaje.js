const fs = require("fs");

modules.exports = class Mensaje {
  constructor(messages) {
    this.messages = messages;
    this.historial_msjs = [];
  }
  async getMessages() {
    const _dir = "./src/historial_msjs/historyMessages.txt";
    try {
      const data = await fs.promises.readFile(_dir, "utf8");
      if (data) {
        const msjs = JSON.parse(data);
        const datos = msjs.map((p) => p == p);
        return datos;
      }
    } catch (error) {}
  }

  async saveMenssage(messages) {
    try {
      const leidos = await getMessages();
      leidos.push({messages});

      const msj = await fs.promises.writeFile(
        "./src/historial_msjs/historyMessages.txt",
        JSON.stringify(leidos, null, 2)
      );
      return leidos;
    } catch (error) {}
  }
};
