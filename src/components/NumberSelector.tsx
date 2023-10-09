import React from 'react';

interface NumberSelectorProps {
    onClick: (value: string) => void
}

export default class NumberSelector extends React.Component<NumberSelectorProps> {
    render() {
        let values = [...Array(11)].map((_, i) => i.toString());
        return (
            <div>
                <div className="number-selector-row">
                    {values.slice(0, 1).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="number-selector-row">
                    {values.slice(1, 6).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
                <div className="number-selector-row">
                    {values.slice(6, 11).map((value) => {
                        return (
                            <button key={"number-selector-" + value} className="number-selector" onClick={() => this.props.onClick(value)}>{value}</button>
                        )
                    })}
                </div>
            </div>
        )
    }
}
