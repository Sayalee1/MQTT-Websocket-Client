/**
 * Connection to MQTT Broker - MQTT WebSocket Client
 */
	var cid = "CID" + parseInt(Math.random() * 100, 10);
	
	var wsclient = {
			'connect': function () {
				var broker = $('#broker').val();
				var port = parseInt($('#brokerport').val());
				//var cid = "CID" + parseInt(Math.random() * 100, 10);
				
				this.client = new Paho.MQTT.Client(broker, port, cid);
				this.client.onConnectionLost = this.onConnectionLost;
		        this.client.onMessageArrived = this.onMessageArrived;
		        
		        var options = {
		                timeout: 3,
		                onSuccess: function (frame) {
		                	$('#status').text('Connected to "' + broker +":"+ port + '"');
		                	$('#status').css({"color":"green", "font-weight":"Bold"});
		                	$('#cid').text(cid);
		                },
		                onFailure: function (message) {
		                    $('#status').text("Connection failed - " + message.errorMessage);
		                    $('#status').css({"color":"red" , "font-weight":"Bold"});
		                }
		            };
		        this.client.connect(options);

			},
			
			'disconnect': function (){
				this.client.disconnect();
				$('#status').text("Disconnected");
				$('#status').css({"color":"red" , "font-weight":"Bold"});
			},
			
			'onConnectionLost': function (responseObject) {
			    if (responseObject.errorCode !== 0) {
			    	alert("Your MQTT Connection is Lost:"+responseObject.errorMessage);
			    	$('#status').text("Connection Lost");
					$('#status').css({"color":"red" , "font-weight":"Bold"});
			      }
			    },
			   
			 'onMessageArrived': function (message) {
			        $('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + 'Message:' + message.payloadString + '</span><br/>');
			    },
			    
			 'publish' : function (payload, topic, qos, retain) {
				    var message = new Paho.MQTT.Message(payload);
				    message.destinationName = topic;
				    message.qos = qos;
				    message.retained = retain;
				    this.client.send(message);
				},
				
			'subscribe' : function(topic, q){
				this.client.subscribe(topic, {qos: q});
				var new_topic = $('#sub_topic').val();
		
				if(($('#new_topic').length) == 0) {
					$('#subtlist').append('<li>'+new_topic+'</li>');
			    }
			    return false;
			}			
			
	}
		

		

	    



