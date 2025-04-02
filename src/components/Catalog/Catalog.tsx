import { useRef, useState } from 'react';

import { data, params } from '../../data';
import { type Model, ParamEditor } from '../ParamEditor/ParamEditor';
import { Dialog } from '../Dialog/Dialog';

import './Catalog.css';

export function Catalog() {
  const [items, setItems] = useState<Model[]>(data);
  const [paramEditorCurrModel, setParamEditorCurrModel] = useState<Model | null>(null);

  const paramEditorRef = useRef<ParamEditor | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function updateModel() {
    if (paramEditorRef.current && paramEditorCurrModel) {
      const updatedModel = paramEditorRef.current.getModel();

      setItems(i => {
        const newItems = [...i];
        const modelToUpdate = newItems.find(model => model == paramEditorCurrModel)!;
        modelToUpdate.paramValues = updatedModel.paramValues;
        return newItems;
      });

      setParamEditorCurrModel(null);
    }
  }

  function toggleDialog() {
    if (!dialogRef.current) return;

    if (dialogRef.current.hasAttribute('open')) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }

  return (
    <section className="catalog">
      <div className="catalog__item-wrapper">
        {items.map((model, i) => (
          <div
            key={i}
            className="catalog__item"
            onClick={() => {
              setParamEditorCurrModel(model);
              toggleDialog();
            }}
          >
            {model.paramValues.map(({ paramId, value }) => (
              <span key={paramId}>{value}</span>
            ))}
          </div>
        ))}
      </div>
      <Dialog
        ref={dialogRef}
        onClose={() => setParamEditorCurrModel(null)}
        toggleDialog={toggleDialog}
      >
        {paramEditorCurrModel && (
          <form
            className="catalog__param-editor-wrapper"
            onSubmit={e => {
              e.preventDefault();
              updateModel();
              toggleDialog();
            }}
          >
            <ParamEditor ref={paramEditorRef} params={params} model={paramEditorCurrModel} />
            <menu className="catalog__param-editor-controls">
              <button type="reset" onClick={toggleDialog}>
                Закрыть
              </button>
              <button type="submit">Сохранить</button>
            </menu>
          </form>
        )}
      </Dialog>
    </section>
  );
}
