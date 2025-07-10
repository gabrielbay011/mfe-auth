import { ModalProps } from "../types/modal-type";

//Componente modal reutilizável
export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-70 md:w-100">
      <div className="bg-white rounded-[20px] p-5 shadow-md">{children}</div>
    </div>
  );
}
