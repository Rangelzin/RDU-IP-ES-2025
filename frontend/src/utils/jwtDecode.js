export function jwtDecode(token) {
  if (typeof token !== 'string' || !token) {
    console.error("Token inválido: não é uma string ou está vazio.");
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("O token JWT é inválido. Ele deve conter 3 partes separadas por pontos.");
    }

    const [headerB64, payloadB64, signature] = parts;

    const decode = (base64Url) => {
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    };


    const header = decode(headerB64);
    const payload = decode(payloadB64);
    
    return {
      header,
      payload,
      signature
    };

  } catch (e) {
    console.error("Falha ao decodificar o token JWT:", e);
    return null;
  }
}