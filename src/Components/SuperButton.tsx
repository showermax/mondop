import React from 'react';

type PropsType ={
    onClickCallBack: ()=> void
    name: string
}
export function SuperButton(props: PropsType) {
    return (
        <button onClick={props.onClickCallBack}>{props.name}</button>
    )
}