
//Config
var Config = null;

 init_config();


function init_config(){
    Config = new Object();
    $.getJSON('?GetConfig', OnLoadConfig);
}

function OnLoadInfo(data)
{
    $('#server_info').text(data.server_info);
    if(data.need_down)
        setTimeout(UpdateInfo, 2000);
}

function UpdateInfo()
{
    $.getJSON('?GetConfig', OnLoadInfo);
}

function OnLoadConfig(data)
{
    Config = data;
    if(Config.di_mode == 1)
    $('#radio_di').prop('checked','checked');
    else
    if(Config.di_mode == 2)
    $('#radio_fm').prop('checked','checked');
    else
    $('#radio_st').prop('checked','checked');
    if(Config.gapless_mode)
      $('#check_gapless').prop('checked','checked');
    else
      $('#check_gapless').prop('checked','');
    if(Config.preload_mode)
      $('#check_preload').prop('checked','checked');
    else
      $('#check_preload').prop('checked','');
    $('#pframes').val(Config.pframes.toString());
    $('#bframes').val(Config.bframes.toString());
    $('#pmks').val(Config.pmks.toString());
    $('#bmks').val(Config.bmks.toString());
     if(Config.dop_mode == 0)
        $('#radio_pcm').prop('checked','checked');
    else
    if(Config.dop_mode == 1)
        $('#radio_dop').prop('checked','checked');
    else
    if(Config.dop_mode == 2)
        $('#radio_dsd').prop('checked','checked');
    if(Config.pcm_freq ==3)
    $('#radio_352').prop('checked','checked');
    else
    if(Config.pcm_freq ==2)
    $('#radio_176').prop('checked','checked');
    else
    if(Config.pcm_freq ==1)
    $('#radio_88').prop('checked','checked');
    else $('#radio_44').prop('checked','checked');
    if(Config.volume_enabled)
        $('#check_volume').prop('checked','checked');
    else
        $('#check_volume').prop('checked','');
    $('#check_16bit').prop('checked',Config.mode_16bit ? 'checked' : '');
    $('#check_24bit').prop('checked',Config.mode_24bit ? 'checked' : '');
    if(Config.lock_memory)
        $('#check_memory').prop('checked','checked');
    else
        $('#check_memory').prop('checked','');
    $('#priority').val(Config.priority.toString());
    $('#nice').val(Config.nice.toString());
    if(Config.affinity_mode == 1)
        $('#cores1').prop('checked','checked');
    else
    if(Config.affinity_mode == 2)
        $('#cores2').prop('checked','checked');
    else
        $('#cores0').prop('checked','checked');
    $('#stat_root').text((Config.stat_root == 1) ? "yes" : "no");
    $('#stat_cores').text(Config.stat_cpus.toString());
    $('#stat_prio').text(Config.stat_prio.toString());
    $('#stat_nice').text(Config.stat_nice.toString());
    $('#stat_16bit').text((Config.stat_16bit == 1) ? "yes" : "no");
    $('#td16').css('visibility',(Config.stat_16bit == 1) ? 'visible' : 'hidden');
    $('#td24').css('visibility',(Config.stat_24bit == 1 && Config.stat_32bit == 1) ? 'visible' : 'hidden');
    $('#stat_24bit').text((Config.stat_24bit == 1) ? "yes" : "no");
    $('#stat_32bit').text((Config.stat_32bit == 1) ? "yes" : "no");
    $('#stat_dsd').text("no");
    if((Config.stat_dsd32be == 1))
            $('#stat_dsd').text("DSD_U32_BE");
    else if((Config.stat_dsd32le == 1))
            $('#stat_dsd').text("DSD_U32_LE") ;
    $('#radio_dsd').prop("disabled",(Config.stat_dsd32le ==1 || Config.stat_dsd32be==1)? false : true);
    if($('#radio_dsd').prop("disabled"))
        $('#ndsd').addClass('disabled');
    var is_playing = Config.stat_playing == 1;
    $('#stat_play').text(is_playing ? "yes" : "no");
    if(is_playing)
    {
      $('#status tr.playing').show();
      $('#stat_play_file').text(Config.stat_file);
      $('#stat_period_size').text(Config.stat_period_size);
      $('#stat_buffer_size').text(Config.stat_buffer_size);
      $('#stat_vol').text(Config.stat_vol > -1 ? Config.stat_vol : 'disabled');
      $('#stat_freq').text(Config.stat_freq);
      $('#stat_bps').text(Config.stat_bps);    
    }
    else
    {
      $('#status tr.playing').hide();
    }
    $('#CardNum').text("");
    $('#asound').text("");
    if(Config.asound != undefined && Config.asound != null)
        Config.asound.forEach(function(element) {
        $('#asound').append(element.toString());
        $('#asound').append("<br>");
        }, Config.asound);
    if(Config.cards != undefined && Config.cards != null)
        Config.cards.forEach(function(element, i) {
        $('#cards').append(element.toString());
        $('#cards').append("<br>");
        if(i % 2)
            $('#cards').append("<br>");
        }, Config.cards);
    //DSP
    if(Config.multi_mode)
    $('#check_multi').prop('checked','checked');
    else
    $('#check_multi').prop('checked','');
    if(Config.swap_mode)
    $('#check_swap').prop('checked','checked');
    else
    $('#check_swap').prop('checked','');
    if(Config.phase_mode)
    $('#check_phase').prop('checked','checked');
    else
    $('#check_phase').prop('checked','');
    $('#res_bf44').val(Config.res_bf44).change();
    $('#res44').val(Config.res44).change();
    $('#res48').val(Config.res48).change();
    $('#res88').val(Config.res88).change();
    $('#res96').val(Config.res96).change();
    $('#res176').val(Config.res176).change();
    $('#res192').val(Config.res192).change();
    $('#res352').val(Config.res352).change();
    $('#res384').val(Config.res384).change();
    $('#soxr_phase').val(Config.soxr_phase).change();
    $('#soxr_filter').prop('checked',Config.soxr_filter ? 'checked' : '');
    $('#soxr_quality').prop('checked', Config.soxr_quality ? 'checked' : '');
    $('#std_buffer').val(Config.std_buffer.toString());
    $('#silence').val(Config.si_time.toString());
    if(Config.mmap == 1)
        $('#mmap').prop('checked','checked');
    else
        $('#rw').prop('checked','checked');
    $('#enable_dsd').prop('checked',Config.enable_dsd ? 'checked' : '');
    $('#dsd_filter').val(Config.filter).change();
    $('#dsd_output').val(Config.output).change();
    $('#dsd_rate').val(Config.rate).change();
    $('#dsd_level').val(Config.level).change();
    $('#dsd_multithread').prop('checked',Config.multithread ? 'checked' : '');
    $('#check_down').prop('checked',Config.need_down ? 'checked' : '');
    $('#server_info').text(Config.server_info);
    if(Config.exists_conv == true)
        $('#convtab').css('display','block');
    else
        $('#convtab').css('display','none');
    $('#filters').html(Config.conv_list);
    $('#filtdesc').html(Config.conv_desc);
    $('#FilterNum').val(Config.conv_filter).change();
    $('#db').val(Config.conv_db/10.0).change();
   // document.getElementById('db').value=Config.conv_db/10.0;
    $('#conv_en').prop('checked', Config.use_conv ? 'checked' : '');
    $('#hwvolume').prop('checked', Config.hw_volume? 'checked' : '');
    $('#hwlist').html(''); 
    var nn = 0;
      if(Config.hw_list != undefined && Config.hw_list != null)  
        Config.hw_list.forEach(function(element, i) {
      $('#hwlist').append(new Option(element, nn++));    
        }, Config.hw_list);
        if (nn) {
        	           $('#hwvolume').css('display','inline');
  						  $('#lhw').css('display','inline');
  						  $('#hwlist').css('display','inline');			  
  						  $('#hwlist').val('0');	  
        }
        else {
                    $('#hwvolume').css('display','none');
  						  $('#lhw').css('display','none');
  						  $('#hwlist').css('display','none');
        }
      if(nn> Config.hw_index) 			
           $('#hwlist').val(Config.hw_index.toString());
 	$('#att').val(Config.att.toString());  
    var tabs = $('#tabs');
    $('.tabs-content > div', tabs).each(function(i){
        if ( i != 0 ) $(this).hide(0);
    });
    tabs.on('click', '.tabs a', function(e){
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.tabs a',tabs).removeClass();
        $(this).addClass('active');
        $('.tabs-content > div', tabs).hide(0);
        if(tabId.toString() == "#status")
              $.getJSON('?GetConfig', OnLoadStatus);
        $(tabId).show();
    });
    if(Config.need_down)
            setTimeout(UpdateInfo, 2000);
}

function OnLoadStatus(data)
{
    Config = data;
    $('#stat_root').text((Config.stat_root == 1) ? "yes" : "no");
    $('#stat_cores').text(Config.stat_cpus.toString());
    $('#stat_prio').text(Config.stat_prio.toString());
    $('#stat_nice').text(Config.stat_nice.toString());
    $('#stat_16bit').text((Config.stat_16bit == 1) ? "yes" : "no");
    $('#stat_24bit').text((Config.stat_24bit == 1) ? "yes" : "no");
    $('#stat_32bit').text((Config.stat_32bit == 1) ? "yes" : "no");
    var is_playing = Config.stat_playing == 1;
    $('#stat_play').text(is_playing ? "yes" : "no");
    if(is_playing)
    {
      $('#status tr.playing').show();
      $('#stat_play_file').text(Config.stat_file);
      $('#stat_period_size').text(Config.stat_period_size+" frames, "+ Config.stat_period_time+" µs");
      $('#stat_buffer_size').text(Config.stat_buffer_size + " frames, "+ Config.stat_period_time*Config.stat_buffer_size/Config.stat_period_size  + " µs");
      $('#stat_vol').text(Config.stat_vol > -1 ? Config.stat_vol : 'disabled');      
      $('#stat_freq').text(Config.stat_freq);
      $('#stat_bps').text(Config.stat_bps);    
    }
    else
    {
      $('#status tr.playing').hide();
    }
}

function ExitApp()
{
    document.location = '/stop';
}

function HideConfig()
{

       window.history.back();
}

function StartPage2()
{
  $('#CardNum').val('').change();
  document.location = '/';
}

function StartPage()
{
    setTimeout(StartPage2, 2000);
}


function SaveConfig()
{
    if($('#CardNum').val() != '')
    {
        SelectCard();
        return;
    }

     var arr = new Object;
    if($('#check_gapless').is(':checked'))
        arr['gapless_mode'] =  true;
    else
        arr['gapless_mode'] = false;
    if($('#check_preload').is(':checked'))
        arr['preload_mode'] =  true;
    else
        arr['preload_mode'] = false;
    arr['di_mode'] =  $('#radio_di').is(':checked') ? 1 : ($('#radio_fm').is(':checked') ? 2 : 0);
    arr['pframes'] = parseInt($('#pframes').val());
    arr['bframes'] = parseInt($('#bframes').val());
    arr['pmks'] = parseInt($('#pmks').val());
    arr['bmks'] = parseInt($('#bmks').val());
    arr['mode_16bit'] = $('#check_16bit').is(':checked') ? true : false;
    arr['mode_24bit'] = $('#check_24bit').is(':checked') ? true : false;
    if($('#radio_pcm').is(':checked'))
        arr['dop_mode'] =  0;
    else
    if($('#radio_dop').is(':checked'))
        arr['dop_mode'] =  1;
    else
        if($('#radio_dsd').is(':checked'))
        arr['dop_mode'] = 2;
    if($('#radio_352').is(':checked'))
        arr['pcm_freq'] = 3;
    else
    if($('#radio_176').is(':checked'))
        arr['pcm_freq'] = 2;
    else
    if($('#radio_88').is(':checked'))
        arr['pcm_freq'] = 1;
    else
        arr['pcm_freq'] = 0;
    if($('#check_volume').is(':checked'))
        arr['volume_enabled'] = true;
    else
        arr['volume_enabled'] = false;
    if($('#check_memory').is(':checked'))
        arr['lock_memory'] =  true;
    else
        arr['lock_memory'] = false;
    arr['priority'] = parseInt($('#priority').val());
    arr['nice'] =  parseInt($('#nice').val());
    if($('#cores1').is(':checked'))
        arr['affinity_mode'] = 1;
    else
    if($('#cores2').is(':checked'))
        arr['affinity_mode'] = 2;
    else
        arr['affinity_mode'] = 0;
    if($('#check_multi').is(':checked'))
        arr['multi_mode'] =  true;
    else
        arr['multi_mode'] = false;
    if($('#check_swap').is(':checked'))
        arr['swap_mode'] =  true;
    else
        arr['swap_mode'] = false;
    if($('#check_phase').is(':checked'))
        arr['phase_mode'] =  true;
    else
        arr['phase_mode'] = false;
    arr['res_bf44'] =parseInt($('#res_bf44').val());
    arr['res44'] =parseInt($('#res44').val());
    arr['res48'] =parseInt($('#res48').val());
    arr['res88'] =parseInt($('#res88').val());
    arr['res96'] =parseInt($('#res96').val());
    arr['res176'] =parseInt($('#res176').val());
    arr['res192'] =parseInt($('#res192').val());
    arr['res352'] =parseInt($('#res352').val());
    arr['res384'] =parseInt($('#res384').val());
    arr['soxr_phase'] = parseInt($('#soxr_phase').val());
    arr['soxr_filter'] = $('#soxr_filter').is(':checked') ?  true : false;
    arr['soxr_quality'] =  $('#soxr_quality').is(':checked') ? true : false;
    arr['std_buffer'] = parseInt($('#std_buffer').val());arr['si_time'] = parseInt($('#silence').val());
    arr['mmap'] =  $('#mmap').is(':checked') ? 1 : 0;
    arr['enable_dsd'] =  $('#enable_dsd').is(':checked') ? 1 : 0;
    arr['filter'] =parseInt($('#dsd_filter').val());
    arr['output'] =parseInt($('#dsd_output').val());
    arr['rate'] =parseInt($('#dsd_rate').val());
    arr['level'] =parseInt($('#dsd_level').val());
    arr['multithread'] = $('#dsd_multithread').is(':checked') ? 1 : 0;
    arr['need_down'] =  $('#check_down').is(':checked') ? 1 : 0;
    arr['use_conv'] = $('#conv_en').is(':checked') ? true : false;
    arr['conv_filter'] =parseInt($('#FilterNum').val());
    arr['conv_db'] = document.getElementById('db').value * 10;
    var hwind = parseInt($('#hwlist').val());  
    if(isNaN(hwind))
        hwind = 0;
    arr['hw_index'] = hwind;
    arr['hw_volume'] = $('#hwvolume').is(':checked') ? true : false;  
    arr['att'] = parseInt($('#att').val());
    $.ajax({
            url:'SetConfig',
            type:'POST',
             data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
            }
        );
     $('#config_label').text('Settings saved');
     setTimeout(function() {$('#config_label').text('');UpdateInfo();}, 2000);
}

function SelectCard()
{
   if(Config.stat_root != 1)
    {
        alert("Root User required!");
        $('#CardNum').val('').change();
        return;
    }
    var num =  $('#CardNum').val();
    $.getJSON('?SelectCard&card=' + num, StartPage);
}

function AttChange(pos)
{
        document.getElementById('dbtx').innerText = pos;
}
