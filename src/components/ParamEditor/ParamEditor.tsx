import React from 'react';

import './ParamEditor.css';

export interface Param {
  id: number;
  name: string;
  type: 'string';
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  hex: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface FullParam {
  paramValue: ParamValue;
  paramDescription: Param;
}

interface ParamEditorState {
  fullParams: Map<number, FullParam>;
}

export class ParamEditor extends React.Component<ParamEditorProps, ParamEditorState> {
  constructor(props: ParamEditorProps) {
    super(props);

    const fullParams = this.createFullParamsMap();

    this.state = {
      fullParams,
    };
  }

  render(): React.ReactNode {
    return (
      <div className="param-editor">
        {[...this.state.fullParams.keys()].map(k => {
          const fullParam = this.state.fullParams.get(k)!;

          return (
            <ParamEditorField
              key={k}
              fullParam={fullParam}
              onChange={e => this.handleInputChange(e, k)}
            />
          );
        })}
      </div>
    );
  }

  private createFullParamsMap(): Map<number, FullParam> {
    const { model, params } = this.props;
    const paramsMap = new Map(params.map(p => [p.id, p]));
    const fullParamsMap = new Map<number, FullParam>();

    model.paramValues.forEach(paramValue => {
      fullParamsMap.set(paramValue.paramId, {
        paramValue: { ...paramValue },
        paramDescription: paramsMap.get(paramValue.paramId)!,
      });
    });

    return fullParamsMap;
  }

  private handleInputChange(e: React.ChangeEvent<HTMLInputElement>, k: number) {
    this.setState(p => {
      const newFullParams = new Map(p.fullParams);
      const fullParam = newFullParams.get(k)!;
      fullParam.paramValue = { ...fullParam.paramValue, value: e.target.value };

      return { fullParams: newFullParams };
    });
  }

  public getModel(): Model {
    const newModelParams: ParamValue[] = [];
    this.props.model.paramValues.forEach(({ paramId }) =>
      newModelParams.push(this.state.fullParams.get(paramId)!.paramValue)
    );

    const updatedModel: Model = {
      colors: this.props.model.colors,
      paramValues: newModelParams,
    };

    return updatedModel;
  }
}

interface ParamEditorFieldProps {
  fullParam: FullParam;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class ParamEditorField extends React.Component<ParamEditorFieldProps> {
  render(): React.ReactNode {
    const { fullParam, onChange } = this.props;

    return (
      <div className="param-editor__field">
        <label>
          {fullParam.paramDescription.name}
          <ParamEditorInput fullParam={fullParam} onChange={onChange} />
        </label>
      </div>
    );
  }
}

interface ParamEditorInputProps {
  fullParam: FullParam;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class ParamEditorInput extends React.Component<ParamEditorInputProps> {
  render(): React.ReactNode {
    const {
      fullParam: {
        paramDescription: { type },
        paramValue: { value },
      },
      onChange,
    } = this.props;

    switch (type) {
      case 'string':
        return <input type="text" value={value} onChange={onChange} />;

      default:
        return null;
    }
  }
}
