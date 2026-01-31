# Development Guide

Quick reference for running the National Design System locally and on mobile devices.

## 🚀 Quick Start (Auto-detect IP)

### Option 1: Batch Script (Windows CMD)
Double-click or run:
```bash
serve-network.bat
```

### Option 2: PowerShell Script (Recommended)
Right-click → "Run with PowerShell" or run:
```powershell
.\serve-network.ps1
```

### Option 3: NPM Scripts
```bash
npm run serve:network
# or
npm run dev
# or
npm start
```

All methods will:
- ✅ Auto-detect your active network IP
- ✅ Display mobile access URL
- ✅ Start Jekyll server on port 4002
- ✅ Enable network access automatically

## 📱 Mobile Testing

Once the server is running, access from your mobile device:
```
http://YOUR_IP:4002
```

The scripts will display your IP automatically, for example:
```
http://192.168.1.18:4002
```

### Requirements
- Mobile device must be on the same Wi-Fi network
- Windows Firewall may prompt for access (click "Allow")

## 🛠️ Manual Setup

If you prefer manual control:

```bash
# Start Jekyll with network access
bundle exec jekyll serve

# Find your IP manually
ipconfig
# Look for "IPv4 Address" under Wi-Fi or Ethernet adapter
```

## 📋 Development Commands

```bash
# Install dependencies
bundle install

# Start local server (localhost only)
bundle exec jekyll serve

# Start server with network access
bundle exec jekyll serve --host 0.0.0.0

# Build static site
bundle exec jekyll build
# or
npm run build

# Process JavaScript files
ruby _plugins/js_processor.rb
```

## 🎨 Mobile Testing Checklist

Since NDS is **RTL-first (Arabic)**, test these on mobile:

- [ ] Arabic text rendering (right-to-left layout)
- [ ] Touch target sizes (24px, 32px, 40px button heights)
- [ ] Mobile breakpoint behavior (max-width: 599px)
- [ ] Navigation drawer on mobile
- [ ] Touch interactions and gestures
- [ ] Component states (hover becomes tap)
- [ ] Form inputs and keyboards

## 🔧 Configuration

Network access is configured in `_config.yml`:

```yaml
port: 4002
host: 0.0.0.0  # Allow network access
```

## 🌐 Browser Access URLs

- **Local:** http://localhost:4002
- **Network:** http://[YOUR_IP]:4002
- **IPv4 example:** http://192.168.1.18:4002

## 💡 Tips

1. **Windows Firewall:** First time running, Windows may block access. Allow Ruby through the firewall.
2. **IP Changes:** If your IP changes, just restart the serve script - it will auto-detect the new IP.
3. **Port in Use:** If port 4002 is busy, change `port:` in `_config.yml`.
4. **Multiple Devices:** Test on phones, tablets, and different browsers simultaneously.

## 🐛 Troubleshooting

**Mobile can't connect:**
- Verify both devices are on same Wi-Fi network
- Check Windows Firewall settings
- Ensure Jekyll server is running (look for startup messages)

**IP not detected:**
- Run `ipconfig` manually to verify network connection
- Check that Wi-Fi or Ethernet adapter is active
- Try the PowerShell script for better detection

**Port 4002 already in use:**
- Stop any other Jekyll instances
- Change port in `_config.yml`
- Use `netstat -ano | findstr :4002` to find blocking process
