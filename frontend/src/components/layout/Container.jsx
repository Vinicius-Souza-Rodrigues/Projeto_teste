function Container(props) {
    return (
        <div className={`${customClass}`}>
            {props.children}
        </div>
    )
}

export default Container