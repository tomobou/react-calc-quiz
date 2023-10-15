import React from 'react';

interface NumberSelectorProps {
    onClick: (value: string) => void
}

export default class NumberSelector extends React.Component<NumberSelectorProps> {
    render() {
        let allValues = [...Array(21)].map((_, i) => i.toString());
        let numberTables = Array<Array<string>>();
        let a = 0;
        let b = 0;
        numberTables[a] = [];
        for (let i = 0; i < allValues.length; i++) {
            numberTables[a][b] = allValues[i];
            b++;
            if (parseInt(allValues[i]) % 5 === 0) {
                a++;
                numberTables[a] = [];
                b = 0;
            }
        }
        return (
            <div className='number-selector'>
                {numberTables.map((values,index) => {
                    return (
                        <div key={"number-selector-row-" + index} className="number-selector-row">
                            {values.map((value) => {
                                return (
                                    <button key={"number-selector-item" + value} className="number-selector-item" onClick={() => this.props.onClick(value)}>{value}</button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
