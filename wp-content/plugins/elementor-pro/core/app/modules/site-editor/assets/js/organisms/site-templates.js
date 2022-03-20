import{CssGrid,Dialog}from '@elementor/app-ui';import SiteTemplate from '../molecules/site-template';import{PartActionsDialogs}from '../part-actions/dialogs-and-buttons';import{Context as TemplatesContext}from '../context/templates';import useTemplatesScreenshot from '../hooks/use-templates-screenshot';export default function SiteTemplates(props){const{templates:contextTemplates,action,resetActionState}=React.useContext(TemplatesContext);let gridColumns,templates;templates=React.useMemo(()=>{return Object.values(contextTemplates).sort((a,b)=>{if(!b.isActive&&!a.isActive){if(('draft'===b.status&&'draft'===a.status)||('draft'!==b.status&&'draft'!==a.status)){return b.date<a.date?1:-1;}
return 'draft'===a.status?1:-1;}
if(b.isActive&&a.isActive){return b.date<a.date?1:-1;}
return b.isActive?1:-1;});},[contextTemplates]);useTemplatesScreenshot(props.type);const siteTemplateConfig={};if(props.type){templates=templates.filter((item)=>item.type===props.type);siteTemplateConfig.extended=true;siteTemplateConfig.type=props.type;switch(props.type){case 'header':case 'footer':gridColumns=1;siteTemplateConfig.aspectRatio='wide';break;default:gridColumns=2;}}
if(!templates||!templates.length){return<h3>{__('No Templates found. Want to create one?','elementor-pro')}...</h3>;}
return(<section className="e-site-editor__site-templates"><PartActionsDialogs/>{action.error&&<Dialog
text={action.error}
dismissButtonText={__('Go Back','elementor-pro')}
dismissButtonOnClick={resetActionState}
approveButtonText={__('Learn More','elementor-pro')}
approveButtonColor="link"
approveButtonUrl="https://go.elementor.com/app-theme-builder-template-load-issue"
approveButtonTarget="_target"/>}<CssGrid columns={gridColumns}spacing={24}colMinWidth={200}>{templates.map((item)=><SiteTemplate
key={item.id}
{...item}
{...siteTemplateConfig}
isSelected={parseInt(props.id)===item.id}/>,)}</CssGrid></section>);}
SiteTemplates.propTypes={type:PropTypes.string,id:PropTypes.string,};