/**
 * Created by xing on 03/05/2017.
 */
function CDeLibMsgPage( _oParent, _nDuration )
{
	var m_oThis			= this;
	var m_sBoxSelector		= "#msg-page";
	var m_sIconSelector		= m_sBoxSelector + " .js-icon i";
	var m_sTitleSelector		= m_sBoxSelector + " .js-text-title";
	var m_sDescSelector		= m_sBoxSelector + " .js-text-desc";
	var m_sBtnOKSelector		= m_sBoxSelector + " .js-button-ok";
	var m_sBtnCancelSelector	= m_sBoxSelector + " .js-button-cancel";
	var m_nDuration			= ( 'number' === typeof _nDuration ? _nDuration : 200 );


	//	properties
	this.oParent		= _oParent;


	this.showMsgPage = function( sType, sTitle, sDesc, sBtnOK, pfnCallbackOK, sBtnCancel, pfnCallbackCancel )
	{
		var nWidth;

		//
		//	initialize message box
		//
		$( m_sIconSelector ).attr( "class", _getIconClassedByType( sType ) );
		$( m_sTitleSelector ).text( sTitle );
		$( m_sDescSelector ).text( sDesc );

		if ( $lslen( sBtnOK ) > 0 )
		{
			$( m_sBtnOKSelector ).text( sBtnOK )
				.off( "click" ).on( "click", pfnCallbackOK ? pfnCallbackOK : _callbackDefault );
		}
		else
		{
			$( m_sBtnOKSelector ).hide();
		}

		if ( $lslen( sBtnCancel ) > 0 )
		{
			$( m_sBtnCancelSelector ).text( sBtnCancel )
				.off( "click" ).on( "click", pfnCallbackCancel ? pfnCallbackCancel : _callbackDefault );
		}
		else
		{
			$( m_sBtnCancelSelector ).hide();
		}

		//	...
		nWidth = $( window ).width();
		$( m_sBoxSelector )
			.removeClass( "hide" )
			.css( "z-index", $lgtzi( "div" ) + 1 )
			.css( "left", nWidth + "px" )
			.css( "width", nWidth + "px" )
			.animate( { left: 0 }, m_nDuration, function(){} );

	};
	this.hideMsgPage = function()
	{
		return _hideMsgPage();
	};
	this.isMsgPageShown = function()
	{
		return _isMsgPageShown();
	};


	////////////////////////////////////////////////////////////////////////////////
	//	Private
	//

	function __construct()
	{
	}

	function _callbackDefault( oEvent )
	{
		oEvent.preventDefault();
		_hideMsgPage();
	}

	function _hideMsgPage()
	{
		$( m_sBoxSelector )
			.css( "z-index", $lgtzi( "div" ) + 1 )
			.css( "left", "0px" )
			.animate( { left: $( window ).width() }, m_nDuration, function()
			{
				$(this).addClass( "hide" );
			});
	}

	function _isMsgPageShown()
	{
		return ! $(m_sBoxSelector).hasClass( "hide" );
	}

	function _getIconClassedByType( sType )
	{
		if ( ! $liss( sType ) )
		{
			return "";
		}

		var sRet = "";

		switch( sType )
		{
			case "ok" :
				//	ok
				sRet = "weui-icon-success weui-icon_msg";
				break;
			case "err" :
				//	err
				sRet = "weui-icon-warn weui-icon_msg";
				break;
			default:
				//	wrn
				sRet = "weui-icon-warn weui-icon_msg-primary";
				break;
		}

		return sRet;
	}

	//	...
	__construct();
}