# frozen_string_literal: true

require 'socket'

module Jekyll
  module ServerInfo
    class << self
      def get_local_ip
        # Get local IP address
        ip = nil

        begin
          # Try to get IP by connecting to a remote address (doesn't actually connect)
          Socket.ip_address_list.detect do |addr|
            addr.ipv4? && !addr.ipv4_loopback? && !addr.ipv4_multicast?
          end&.ip_address
        rescue StandardError
          nil
        end
      end

      def display_network_info(site)
        # Only show on first build when serving
        return unless defined?(Jekyll::Commands::Serve)
        return if @info_displayed

        @info_displayed = true

        # Get server configuration
        port = site.config['port'] || 4000
        host = site.config['host'] || 'localhost'
        local_ip = get_local_ip

        # Display network information
        Jekyll.logger.info ""
        Jekyll.logger.info "=" * 60
        Jekyll.logger.info "Network Server Information".center(60)
        Jekyll.logger.info "=" * 60
        Jekyll.logger.info ""
        Jekyll.logger.info "  Local Access:"
        Jekyll.logger.info "    http://localhost:#{port}"
        Jekyll.logger.info "    http://127.0.0.1:#{port}"
        Jekyll.logger.info ""

        if local_ip && host == '0.0.0.0'
          Jekyll.logger.info "  Network Access (Mobile/Other Devices):"
          Jekyll.logger.info "    http://#{local_ip}:#{port}"
          Jekyll.logger.info ""
          Jekyll.logger.info "  📱 Scan this on your mobile browser:"
          Jekyll.logger.info "    http://#{local_ip}:#{port}"
          Jekyll.logger.info ""
          Jekyll.logger.info "  ℹ️  Make sure your mobile device is on the same Wi-Fi network"
        elsif host == 'localhost' || host == '127.0.0.1'
          Jekyll.logger.warn "  ⚠️  Network access disabled (host: #{host})"
          Jekyll.logger.warn "  ℹ️  To enable mobile testing, set 'host: 0.0.0.0' in _config.yml"
        end

        Jekyll.logger.info ""
        Jekyll.logger.info "=" * 60
        Jekyll.logger.info ""
      end
    end
  end
end

# Hook into Jekyll's site generation
Jekyll::Hooks.register :site, :post_write do |site|
  # Display network info after first build
  Jekyll::ServerInfo.display_network_info(site)
end
