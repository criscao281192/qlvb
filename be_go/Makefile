# Variables
OUTPUT_FD_MAC=../output-mac
OUTPUT_FD_WINDOWS=../output-windows
SRC=main.go

# Build the binary
build-mac:
	go build -o $(OUTPUT_FD_MAC)/ $(SRC)
	mkdir -p $(OUTPUT_FD_MAC)/public
	cp -r ./public/* $(OUTPUT_FD_MAC)/public
	cp -r .env $(OUTPUT_FD_MAC)

build-windows:
	GOOS=windows GOARCH=amd64 go build -o $(OUTPUT_FD_WINDOWS)/ $(SRC)
	mkdir -p $(OUTPUT_FD_WINDOWS)/public
	cp -r ./public/* $(OUTPUT_FD_WINDOWS)/public
	cp -r .env $(OUTPUT_FD_WINDOWS)

# Clean up the binary
clean-mac:
	rm -rf $(OUTPUT_FD_MAC)

clean-windows:
	rm -rf $(OUTPUT_FD_WINDOWS)

clean-all: clean-mac clean-windows

build-all: build-mac build-windows

