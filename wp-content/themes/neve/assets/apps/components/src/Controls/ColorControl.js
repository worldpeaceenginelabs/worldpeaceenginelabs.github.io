import PropTypes from 'prop-types';import GlobalColorsPicker from '../Common/GlobalColorsPicker';import{Button,Dropdown,Spinner,ColorPicker}from '@wordpress/components';import{lazy,Suspense}from '@wordpress/element';import{__}from '@wordpress/i18n';import classnames from 'classnames';const ColorPickerFix=lazy(()=>import('../Common/ColorPickerFix'));const ColorControl=({label,selectedColor,onChange,defaultValue,disableGlobal,})=>{let toggle=null;const{shouldUseColorPickerFix}=window.nvComponents;const canUseDefaultColorPicker=()=>{if(shouldUseColorPickerFix===undefined){return false;}
return parseInt(shouldUseColorPickerFix)!==1;};const handleChange=(value)=>{const{r,g,b,a}=value.rgb;if(a<1){onChange(`rgba(${r}, ${g}, ${b}, ${a})`);return false;}
onChange(value.hex);};const isGlobal=selectedColor&&selectedColor.indexOf('var')>-1;const handleClear=()=>{onChange(defaultValue||'');toggle();};const wrapClasses=classnames(['neve-control-header','neve-color-component',{'allows-global':!disableGlobal},]);return(<div className={wrapClasses}>{label&&<span className="customize-control-title">{label}</span>}
{!disableGlobal&&(<GlobalColorsPicker
isGlobal={isGlobal}
activeColor={selectedColor}
onChange={onChange}/>)}<Dropdown
renderToggle={({isOpen,onToggle})=>{toggle=onToggle;return(<Button
isSecondary
onClick={onToggle}
aria-expanded={isOpen}
aria-label={__('Color','neve')}><span
className="color"
style={{backgroundColor:selectedColor}}/><span className="gradient"/></Button>);}}
renderContent={()=>(<>{}<a href="#color-picker"/><Suspense fallback={<Spinner/>}>{!canUseDefaultColorPicker()&&(<><ColorPickerFix
color={selectedColor}
onChangeComplete={handleChange}/></>)}
{canUseDefaultColorPicker()&&(<><ColorPicker
color={selectedColor}
onChangeComplete={handleChange}/></>)}</Suspense>{selectedColor&&(<Button
className="clear"
isPrimary
onClick={handleClear}>{__('Clear','neve')}</Button>)}</>)}/></div>);};ColorControl.defaultProps={disableGlobal:false,};ColorControl.propTypes={label:PropTypes.string,onChange:PropTypes.func.isRequired,selectedColor:PropTypes.string,defaultValue:PropTypes.string,disableGlobal:PropTypes.bool,};export default ColorControl;