export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  children: React.ReactNode;
};
