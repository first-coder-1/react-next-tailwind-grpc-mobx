export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "A senha deve ter entre 8.";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve conter ao menos uma letra maiúscula.";
  }

  if (!/[a-z]/.test(password)) {
    return "A senha deve conter ao menos uma letra minúscula.";
  }

  if (!/[0-9]/.test(password)) {
    return "A senha deve conter ao menos um número.";
  }

  return null; // Se passar por todas as verificações, não há erros.
};
