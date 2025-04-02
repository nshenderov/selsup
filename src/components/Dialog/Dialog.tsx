import type { ReactNode } from 'react';

import './Dialog.css';

type DialogProps = {
  children: ReactNode;
  toggleDialog: () => void;
  ref: React.Ref<HTMLDialogElement>;
};

export function Dialog({ children, toggleDialog, ref }: DialogProps) {
  return (
    <dialog
      ref={ref}
      className="dialog"
      onClick={e => {
        if (e.currentTarget === e.target) toggleDialog();
      }}
    >
      <div>{children}</div>
    </dialog>
  );
}
