export default function clearUserData(form, setForm) {
  let localForm = { ...form };

  localForm = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    senhaConfirmar: "",
  };

  return setForm(localForm);
}
