import './preview-iframe.scss';export default function PreviewIFrame(props){const ref=React.useRef(null),previewBreakpoint=1200,[scale,setScale]=React.useState(1),[height,setHeight]=React.useState(0);React.useEffect(()=>{const currentScale=ref.current.clientWidth/previewBreakpoint;setScale(currentScale);setHeight(ref.current.clientHeight/currentScale);},[]);return(<div
ref={ref}
className={`site-editor__preview-iframe site-editor__preview-iframe--${ props.templateType }`}><iframe
src={props.src}
className={`site-editor__preview-iframe__iframe`}
style={{transform:`scale(${ scale })`,height,width:previewBreakpoint}}/></div>);}
PreviewIFrame.propTypes={src:PropTypes.string.isRequired,templateType:PropTypes.string.isRequired,};