export interface InputProps {
       type?: string;
       placeholder?: string;
       value: string;
       onChange: (event: ChangeEvent<HTMLInputElement>) => void;
       name?: string;
       label?: string;
       outerBoxclassName?: string;
       inputBoxclassName?: string;
       labelBoxclassName?: string;
     }