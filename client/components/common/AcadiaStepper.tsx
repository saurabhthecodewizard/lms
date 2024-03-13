import React from 'react';
import CommonButton from './CommonButton';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export interface AcadiaStepperItem {
    title: string;
    subTitle: string;
    component: React.ReactNode;
}

interface AcadiaStepperProps {
    items: AcadiaStepperItem[];
}

const AcadiaStepper: React.FC<AcadiaStepperProps> = (props) => {
    const { items } = props;
    const [selectedComponentIndex, setSelectedComponentIndex] = React.useState<number>(0);

    const selectedComponent = React.useMemo(() => {
        return items.at(selectedComponentIndex)?.component;
    }, [items, selectedComponentIndex]);

    const onClickBackButtonHandler = React.useCallback(() => {
        if (selectedComponentIndex === 0) {
            return;
        }
        setSelectedComponentIndex((prevIndex) => prevIndex - 1);
    }, [selectedComponentIndex]);

    const onClickNextButtonHandler = React.useCallback(() => {
        if (selectedComponentIndex === items.length - 1) {
            return;
        }
        setSelectedComponentIndex((prevIndex) => prevIndex + 1);
    }, [items.length, selectedComponentIndex]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='hidden sm:flex items-center justify-start gap-2'>
                {items.map((item, index) => (
                    <div key={index} className={`flex items-center justify-center gap-2`}>
                        <div className={`flex items-center justify-center rounded-full p-2 w-8 h-8 ${index === selectedComponentIndex ? 'bg-orange-500' : 'bg-slate-50 dark:bg-slate-900'}`}>
                            {index + 1}
                        </div>
                        <div className={`flex items-center justify-center ${index === selectedComponentIndex ? 'text-orange-500 font-bold' : ''}`}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>

            <div className='sm:hidden flex items-center justify-between'>
                <IoIosArrowDropleft size={40} onClick={onClickBackButtonHandler} className={`${selectedComponentIndex === 0 ? 'hidden' : 'cursor-pointer'}`} />
                <div className={`${selectedComponentIndex === 0 ? 'w-10' : 'hidden'}`}></div>
                <div className={`flex flex-col items-center justify-center gap-2`}>
                    <div className={`flex items-center justify-center rounded-full w-8 h-8 bg-orange-500`}>
                        {selectedComponentIndex + 1}
                    </div>
                    <div className={`flex items-center justify-center text-orange-500 font-bold`}>
                        {items[selectedComponentIndex].title}
                    </div>
                </div>
                <IoIosArrowDropright size={40} onClick={onClickNextButtonHandler} className={`${selectedComponentIndex === items.length - 1 ? 'hidden' : 'cursor-pointer'}`} />
                <div className={`${selectedComponentIndex === items.length - 1 ? 'w-10' : 'hidden'}`}></div>
            </div>

            <div className='flex flex-col justify-between items-center w-full h-full bg-slate-50 dark:bg-slate-900 rounded-lg'>
                {selectedComponent}
            </div>
            <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500" />
            <div className={`flex items-center w-full ${selectedComponentIndex === 0 ? 'justify-end' : selectedComponentIndex === items.length - 1 ? 'justify-start' : 'justify-between'}`}>
                {selectedComponentIndex !== 0 &&
                    <CommonButton theme='outline' onClick={onClickBackButtonHandler}>
                        Back
                    </CommonButton>}
                {selectedComponentIndex !== items.length - 1 &&
                    <CommonButton theme='outline' onClick={onClickNextButtonHandler}>
                        Next
                    </CommonButton>}
            </div>
        </div>
    )
}

export default AcadiaStepper;