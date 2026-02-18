# frozen_string_literal: true

# Display local and network URLs after first serve build.
# Replaces 0.0.0.0 with localhost in Jekyll's "Server address" log line.

require 'socket'

original_logger_info = Jekyll.logger.method(:info)
Jekyll.logger.define_singleton_method(:info) do |topic, *msg|
  if topic.to_s.include?("Server address")
    msg = msg.map { |m| m.to_s.gsub("0.0.0.0", "localhost") }
  end
  original_logger_info.call(topic, *msg)
end

Jekyll::Hooks.register :site, :post_write do |site|
  next unless defined?(Jekyll::Commands::Serve)
  next if @server_info_displayed

  @server_info_displayed = true

  port    = site.config['port'] || 4000
  host    = site.config['host'] || 'localhost'
  baseurl = site.config['baseurl'].to_s

  local_ip = Socket.ip_address_list.detect { |a|
    a.ipv4? && !a.ipv4_loopback? && !a.ipv4_multicast?
  }&.ip_address rescue nil

  Jekyll.logger.info ""
  Jekyll.logger.info "=" * 60
  Jekyll.logger.info "Network Server Information".center(60)
  Jekyll.logger.info "=" * 60
  Jekyll.logger.info ""
  Jekyll.logger.info "  Local:"
  Jekyll.logger.info "    http://localhost:#{port}#{baseurl}"
  Jekyll.logger.info ""

  if local_ip && host == '0.0.0.0'
    Jekyll.logger.info "  Network:"
    Jekyll.logger.info "    http://#{local_ip}:#{port}#{baseurl}"
    Jekyll.logger.info ""
  elsif host == 'localhost' || host == '127.0.0.1'
    Jekyll.logger.warn "  Network access disabled (host: #{host})"
    Jekyll.logger.warn "  Set 'host: 0.0.0.0' in _config.yml for mobile testing"
    Jekyll.logger.info ""
  end

  Jekyll.logger.info "=" * 60
  Jekyll.logger.info ""
end
