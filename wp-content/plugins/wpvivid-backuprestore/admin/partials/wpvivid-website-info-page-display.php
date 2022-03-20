<script type="95272420953444a7d803827f-text/javascript">
    function wpvivid_get_ini_memory_limit() {
        var ajax_data = {
            'action': 'wpvivid_get_ini_memory_limit'
        };
        wpvivid_post_request(ajax_data, function (data) {
            try {
                jQuery('#wpvivid_websiteinfo_list tr').each(function (i) {
                    jQuery(this).children('td').each(function (j) {
                        if (j == 0) {
                            if (jQuery(this).html().indexOf('memory_limit') >= 0) {
                                jQuery(this).next().html(data);
                            }
                        }
                    });
                });
            }
            catch (err) {
                setTimeout(function ()
                {
                    wpvivid_get_ini_memory_limit();
                }, 3000);
            }
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            setTimeout(function ()
            {
                wpvivid_get_ini_memory_limit();
            }, 3000);
        });
    }
    jQuery(document).ready(function ()
    {
        wpvivid_get_ini_memory_limit();
    });
</script>
<script src="https://worldpeaceenginelabs.github.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="95272420953444a7d803827f-|49" defer></script>