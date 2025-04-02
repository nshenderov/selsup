import type { ReactNode } from 'react';

import './Dialog.css';

type DialogProps = {
  children: ReactNode;
  toggleDialog: () => void;
  onClose: () => void;
  ref: React.Ref<HTMLDialogElement>;
};

export function Dialog({ children, toggleDialog, onClose, ref }: DialogProps) {
  return (
    <dialog
      ref={ref}
      className="dialog"
      onClose={onClose}
      onClick={e => {
        if (e.currentTarget === e.target) toggleDialog();
      }}
    >
      <div>{children}</div>
    </dialog>
  );
}
