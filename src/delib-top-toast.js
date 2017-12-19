/**
 *	Created by xing on 01/05/2017.
 */
function CDeLibTopToast( _oParent )
{
	var m_oThis		= this;
	var m_sBoardSelector	= "#top-toast";
	var m_sTextSelector	= m_sBoardSelector + " .text";
	var m_nDuration		= 200;
	var m_nDelay		= 3000;

	//	properties
	this.oParent		= _oParent;


	this.setDuration = function( nDuration )
	{
		if ( nDuration >= 200 && nDuration <= 1000 )
		{
			m_nDuration = nDuration;
		}

		return m_oThis;
	};
	this.setDelay = function( nDelay )
	{
		if ( nDelay > 1000 && nDelay < 10000 )
		{
			m_nDelay = nDelay;
		}

		return m_oThis;
	};

	this.showTopToast = function( sType, sMessage, nDelay )
	{
		m_oThis.setDelay( nDelay );
		_showTopToast( sType, sMessage );

		return m_oThis;
	};
	this.hideTopToast = function()
	{
		_hideTopToast();

		return m_oThis;
	};
	this.isTopToastShown = function()
	{
		return _isTopToastShown();
	};

	////////////////////////////////////////////////////////////
	//	Private

	function __construct()
	{
		_setEventHook();
	}

	function _setEventHook()
	{
		$(m_sBoardSelector).off( "click" ).on( "click", function( oEvent )
		{
			oEvent.preventDefault();
			_hideTopToast();
		});
	}

	function _isTopToastShown()
	{
		return ! $(m_sBoardSelector).hasClass( "hide" );
	}
	function _showTopToast( sType, sMessage )
	{
		//
		//	sMessage	- html
		//	sType		- values('ok','alert','error')
		//
		var sAddedClass;
		var nHeight;

		//	...
		sAddedClass	= _getClassNameByType( sType );

		//
		//	set the message to control for display
		//
		$(m_sTextSelector).text( sMessage );

		if ( ! _isTopToastShown() )
		{
			//	mark as shown
			//_setMessageBoardShown( true );

			//	...
			nHeight	= $(m_sBoardSelector)
				.css( "top", "-200px" )
				.removeClass( "hide top-toast-ok top-toast-wrn top-toast-err" )
				.outerHeight();

			$(m_sBoardSelector)
				.css( "z-index", $lgtzi( "div" ) + 1 )
				.css( "left", "0px" )
				.css( "top", ( -1 * nHeight ) + "px" )
				.addClass( sAddedClass )
				.animate( { top: 0 }, m_nDuration, function(){} )
				.delay( m_nDelay )
				.queue( function()
				{
					_hideTopToast();
					$( this ).dequeue();
				});
		}
	}

	function _hideTopToast()
	{
		var nHeight;

		if ( _isTopToastShown() )
		{
			//	...
			nHeight	= $(m_sBoardSelector)
				.removeClass( "hide" )
				.outerHeight();
			if ( nHeight > 0 )
			{
				$(m_sBoardSelector)
					.animate( { top: ( -1 * nHeight ) }, m_nDuration, function()
					{
						//	mark as hidden
						//_setMessageBoardShown( false );
						$(m_sBoardSelector).addClass( "hide" );
					});
			}
			else
			{
				$(m_sBoardSelector).addClass( "hide" );
			}
		}
	}

	function _getClassNameByType( sType )
	{
		var sRet;

		switch( sType )
		{
			case "ok" :
				sRet = "top-toast-ok";
				break;
			case "err" :
				sRet = "top-toast-err";
				break;
			case "wrn" :
				sRet = "top-toast-wrn";
				break;
			default:
				sRet = "top-toast-def";
				break;
		}

		return sRet;
	}


	//	...
	__construct();
}