/**
 * Created by xing on 05/05/2017.
 */
function CDeLibMsgConfirm( _oParent )
{
	var m_oThis			= this;
	var m_sBoxSelector		= "#msg-confirm";
	var m_sDivMaskSelector		= m_sBoxSelector + " .js-div-mask";
	var m_sDivDialogSelector	= m_sBoxSelector + " .js-div-dialog";
	var m_sTitleSelector		= m_sBoxSelector + " .js-text-title";
	var m_sContentSelector		= m_sBoxSelector + " .js-text-content";
	var m_sBtnCancelSelector	= m_sBoxSelector + " .js-btn-cancel";
	var m_sBtnContinueSelector	= m_sBoxSelector + " .js-btn-continue";

	//	properties
	this.oParent		= _oParent;


	this.showConfirm = function( sTitle, sContent, pfnCallbackCancel, pfnCallbackContinue )
	{
		$( m_sTitleSelector ).text( sTitle );
		$( m_sContentSelector ).text( sContent );

		$( m_sBtnCancelSelector ).off( "click").on( "click", pfnCallbackCancel );
		$( m_sBtnContinueSelector ).off( "click").on( "click", pfnCallbackContinue );

		//	...
		$( m_sBoxSelector ).css( "z-index", $lgtzi( "div" ) + 1 );
		$( m_sDivMaskSelector ).css( "z-index", $lgtzi( "div" ) + 1 );
		$( m_sDivDialogSelector ).css( "z-index", $lgtzi( "div" ) + 1 );

		//	...
		$( m_sBoxSelector ).fadeIn( 200 );
	};

	this.hideConfirm = function()
	{
		$( m_sBoxSelector ).hide();
	};

}