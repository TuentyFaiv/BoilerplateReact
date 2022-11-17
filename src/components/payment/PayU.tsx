import { Input } from "@components";

export default function PayU() {
  return (
    <Input
      label="DNI"
      placeholder="Documento de identidad"
      name="userDocument"
      type="text"
    />
  );
}
