Titanium.Network.registerForPushNotifications({
    types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: "+deviceToken);
        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
 
        var request = Titanium.Network.createHTTPClient();
        request.onload = function()
        {
            Ti.API.info('in utf-8 onload for POST');
        };
        request.onerror = function()
        {
            Ti.API.info('in utf-8 error for POST');
        };
        
        // Your App Name
        var appname = 'transeet';
        
        request.open("GET","http://www.mywebsite.com/index.php?easyapns=register&task=register&appname="+appname+"&appversion="+escape(Titanium.App.version)+"&deviceuid="+escape(Titanium.Platform.id)+"&devicetoken="+escape(e.deviceToken)+"&devicemodel="+escape(Titanium.Platform.model)+"&devicename=tester&deviceversion="+escape(Titanium.Platform.version)+"&pushbadge=enabled&pushalert=enabled&pushsound=enabled");
        request.send();
    },
    error:function(e)
    {
        Ti.API.info(e.error);
 
    },
    callback:function(e)
    {
        // called when a push notification is received.
        Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge+1;
        alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
    }
 
});