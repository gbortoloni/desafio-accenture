const sendMessage = require("./sendMessage");

describe("sendMessage", () => {
  it("should return the object with message", () => {
    const result = sendMessage("Unit Teste");
    expect(result).toEqual({ mensagem: "Unit Teste" });
  });
});
